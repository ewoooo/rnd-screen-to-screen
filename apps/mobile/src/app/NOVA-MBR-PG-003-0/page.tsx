import { RenderSpecScreen } from "../_render-spec-screen";
import renderSpec from "./render.json";
import type { RenderScreenSpec } from "@/screens/render-spec";

const spec = renderSpec as unknown as RenderScreenSpec;

export default function NovaMbrPg0030Page() {
	return <RenderSpecScreen spec={spec} />;
}
