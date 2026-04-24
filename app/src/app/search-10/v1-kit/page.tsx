import {
	ChatBubble,
	DetailShell,
	KeyboardPlaceholder,
	SearchField,
} from "@/components/search-kit";
import { chatFlow } from "@/fixtures/search-flow";

export default function Search10V1Kit() {
	return (
		<DetailShell
			bottom={
				<>
					<SearchField
						value={chatFlow.userQuestion}
						withBackChip
						action="send"
					/>
					<KeyboardPlaceholder />
				</>
			}
		>
			
			<ChatBubble side="user">{chatFlow.userQuestion}</ChatBubble>
		</DetailShell>
	);
}
