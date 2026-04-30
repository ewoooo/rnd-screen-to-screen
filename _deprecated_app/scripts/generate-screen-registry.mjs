#!/usr/bin/env node
// 화면별 구현 버전 목록을 자동 생성한다 (screen-first).
// 스캔: app/src/app/<screen>/v*-*/page.tsx
// 출력: app/src/generated/screen-version-registry.json
// 실행: app/ 디렉토리 기준으로 호출된다 (predev/prebuild).

import { readdirSync, statSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const APP_DIR = resolve(process.cwd(), 'src/app');
const OUT_FILE = resolve(process.cwd(), 'src/generated/screen-version-registry.json');
const VERSION_PATTERN = /^v(\d+)-(.+)$/;
// 라우트 세그먼트가 아닌 Next.js 특수 폴더/루트 파일은 screen으로 보지 않는다.
const RESERVED = new Set(['api', 'assets', 'public']);

const prettyApproach = (raw) => {
  if (raw === 'flex') return 'FlexBox';
  if (raw === 'div') return 'div';
  return raw;
};

const isDir = (p) => {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
};

const hasPageFile = (dir) =>
  existsSync(join(dir, 'page.tsx')) || existsSync(join(dir, 'page.ts'));

const listFiles = (dir) =>
  readdirSync(dir)
    .filter((n) => !isDir(join(dir, n)))
    .sort();

const toRelative = (abs) =>
  abs
    .replace(resolve(process.cwd(), '..') + '/', '')
    .replace(resolve(process.cwd()) + '/', 'app/');

const scanScreens = () => {
  if (!isDir(APP_DIR)) return [];
  return readdirSync(APP_DIR)
    .filter((name) => !name.startsWith('_') && !name.startsWith('(') && !RESERVED.has(name))
    .map((name) => {
      const dir = join(APP_DIR, name);
      if (!isDir(dir)) return null;
      return { id: name, dir };
    })
    .filter(Boolean)
    .sort((a, b) => a.id.localeCompare(b.id));
};

const scanVersions = (screenDir) =>
  readdirSync(screenDir)
    .map((name) => {
      const m = name.match(VERSION_PATTERN);
      if (!m) return null;
      const dir = join(screenDir, name);
      if (!isDir(dir)) return null;
      if (!hasPageFile(dir)) return null;
      return {
        id: name,
        num: Number(m[1]),
        approachRaw: m[2],
        dir,
        files: listFiles(dir),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.num - b.num);

const build = () => {
  const screens = scanScreens()
    .map((s) => {
      const versions = scanVersions(s.dir).map((v) => ({
        id: v.id,
        num: v.num,
        approach: prettyApproach(v.approachRaw),
        label: `v${v.num} · ${prettyApproach(v.approachRaw)}`,
        route: `/${s.id}/${v.id}`,
        path: toRelative(v.dir),
        files: v.files,
      }));
      if (versions.length === 0) return null;
      const latest = versions[versions.length - 1];
      return {
        id: s.id,
        route: `/${s.id}`,
        latest: latest.id,
        versions,
      };
    })
    .filter(Boolean);

  return {
    meta: {
      purpose: '화면별 구현 버전 등록 — 자동 생성. 손으로 편집하지 말 것.',
      generated_at: new Date().toISOString(),
      generator: 'app/scripts/generate-screen-registry.mjs',
      source_pattern: 'app/src/app/<screen>/v*-*/page.tsx',
      do_not_edit: true,
    },
    screens,
  };
};

const registry = build();
mkdirSync(dirname(OUT_FILE), { recursive: true });
writeFileSync(OUT_FILE, JSON.stringify(registry, null, 2) + '\n');
const versionCount = registry.screens.reduce((n, s) => n + s.versions.length, 0);
console.log(
  `[screen-version-registry] ${registry.screens.length} screens · ${versionCount} versions → ` +
    OUT_FILE.replace(resolve(process.cwd()) + '/', ''),
);
