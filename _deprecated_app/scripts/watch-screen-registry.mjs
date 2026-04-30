#!/usr/bin/env node
// src/app/ 변경을 감시하다가 화면/버전 폴더가 추가·삭제·이름변경되면 레지스트리를 재생성한다.
// dev 시 next dev와 병렬로 실행 (scripts/dev.mjs 참고).

import { spawn } from "node:child_process";
import { watch } from "node:fs";
import { resolve, sep } from "node:path";

const APP_DIR = resolve(process.cwd(), "src/app");
const GENERATOR = resolve(process.cwd(), "scripts/generate-screen-registry.mjs");
const DEBOUNCE_MS = 200;

let timer = null;
let running = false;
let pendingRerun = false;

const runGenerator = () => {
	if (running) {
		pendingRerun = true;
		return;
	}
	running = true;
	const child = spawn(process.execPath, [GENERATOR], { stdio: "inherit" });
	child.on("exit", () => {
		running = false;
		if (pendingRerun) {
			pendingRerun = false;
			runGenerator();
		}
	});
};

const schedule = () => {
	if (timer) clearTimeout(timer);
	timer = setTimeout(runGenerator, DEBOUNCE_MS);
};

// 초기 1회 + recursive 감시. 디렉터리 추가/삭제/이름 변경만 의미 있어
// page.tsx 등 파일 수정은 무시(generator가 폴더 구조만 본다).
runGenerator();
const watcher = watch(APP_DIR, { recursive: true }, (_event, filename) => {
	if (!filename) return;
	const parts = filename.split(sep);
	// v{N}-* 폴더 자체나 그 안의 page.tsx 변경만 감지
	const isVersionFolder = parts.some((p) => /^v\d+-/.test(p));
	const isScreenFolder = parts.length === 1; // <screen> 폴더 자체 추가/삭제
	if (!isVersionFolder && !isScreenFolder) return;
	schedule();
});

const shutdown = () => {
	watcher.close();
	process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
