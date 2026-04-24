#!/usr/bin/env node
// next dev + screen-registry 와처를 병렬로 실행.
// 한쪽이 죽으면 다른 쪽도 정리하고 종료.

import { spawn } from "node:child_process";

const procs = [];

const launch = (name, command, args) => {
	const child = spawn(command, args, { stdio: "inherit", shell: false });
	procs.push({ name, child });
	child.on("exit", (code, signal) => {
		// 한 쪽이라도 종료되면 전체 정리
		for (const { child: other } of procs) {
			if (other !== child && other.exitCode === null) other.kill(signal ?? "SIGTERM");
		}
		process.exit(code ?? 0);
	});
};

launch("registry", process.execPath, ["scripts/watch-screen-registry.mjs"]);
launch("next", "npx", ["next", "dev"]);

const shutdown = () => {
	for (const { child } of procs) {
		if (child.exitCode === null) child.kill("SIGTERM");
	}
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
