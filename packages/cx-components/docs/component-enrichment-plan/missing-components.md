# Missing / Local Component Observations

> Staging memo for Figma MOCK SOT components that are not currently first-class `component-inventory.md` entries or appear to be local/domain organisms. This is not final SOT.

## Observed In Figma MOCK

| Figma Component | Page/Section | Observed Use | Initial Decision | Follow-up |
| --- | --- | --- | --- | --- |
| `Local_ProductInfo` | Page Mock-up / detail-product (`14243:29109`) | Product detail top info and expanded detail image/tab area; observed 5 times. | ORGANISM | Keep domain/product meaning in mobile organism unless reused across domains as independent visual vocabulary. |
| `Local_Thumbnail` | Page Mock-up / detail-product (`14243:29109`) | Hero thumbnail for product/detail pages; observed in all 4 detail-product frames. | ORGANISM | Verify whether a generic thumbnail component exists or this remains product detail organism content. |
| `Local_Option` | Page Mock-up / detail-product (`14243:29109`) | Device detail option cells; observed 10 times in grid/list option contexts. | RQR_CANDIDATE review / ORGANISM | Decide after checking if options recur outside device detail. |
| `Local_Card` | Page Mock-up / detail-product (`14243:29109`) | Benefit brand/store cards; observed 6 times. | ORGANISM / README review | May be domain card organism unless repeated in main/list. |
| `Pin` | Page Mock-up / detail-product (`14243:29109`) | Map markers in benefit brand detail; observed 7 times. | ORGANISM | Map-specific visual; keep with map organism unless general map marker needed. |
| `Local_CardCarousel` | Page Mock-up / page-main (`14243:28908`) | Main shopping repeated carousel section; observed 9 times. | ORGANISM / DESIGN_PATTERN | Record as Main shopping section composition. |
| `Local_TitleMain` | Page Mock-up / page-main (`14243:28908`) | Main shopping carousel title block with indicator; observed 9 times. | ORGANISM / TitleMain README review | Compare with existing `TitleMain` before creating anything new. |
| `ListCardItem` / `CardItem` | Page Mock-up / page-main (`14243:28908`) | Main shopping/manage grouped card rows; `Type=List` count 38. | RQR_CANDIDATE review | Evaluate whether this is reusable card-list molecule or domain organism. |
| `Local_CardSection` / `Local_CardSectionTitle` | Page Mock-up / page-main (`14243:28908`) | Manage segment card sections; title repeated 11 times. | ORGANISM / DESIGN_PATTERN | Likely main manage organism composition. |
| `Local_ChipItem` | Page Mock-up / page-main (`14243:28908`) | Shopping chips with icon + text; observed 9 selected-on style uses. | RQR_CANDIDATE review | Compare against `ChipItem`/`Chips`; may require variant if reusable. |
| `ListProductHorizontal` | Page Mock-up / page-list-card (`14243:28727`) | Card list product rows; observed 20 times. | INVENTORY_GAP / RQR_CANDIDATE review | Present in Figma MOCK but not current inventory entry; decide whether to add inventory/candidate. |
| `ListProductVertical` / `ListProductRow` | Page Mock-up / page-list-card (`14243:28727`) | Vertical/row product list modules; observed 16/8 times. | INVENTORY_GAP / RQR_CANDIDATE review | Check implementation or candidate coverage before creating new components. |
| `CarouselProduct` / `CarouselProductModule` | Page Mock-up / page-main and success | Main shopping carousel and completion recommendation; `CarouselProduct` observed in main and success. | INVENTORY_GAP / RQR_CANDIDATE review | Inventory has related names in patterns but no active entry; reconcile naming. |
| `Local_ListInfo` / `Local_Info` | Page Mock-up / page-list_text (`14243:28824`) | Text list notice/history rows; `Local_Info` observed 45 times. | ORGANISM / RQR_CANDIDATE review | Determine if generic list-info molecule is needed or domain list organism is enough. |
| `Local_Summary` | Page Mock-up / page-list_text (`14243:28824`) | Summary banner for history/points/discount lists; observed 3 times. | ORGANISM | Likely domain summary organism. |

## Apply Later

- Reconcile missing repeated product/list/main modules with `component-inventory.md`.
- Promote only repeated, domain-agnostic visual compounds to `RQR` candidates.
- Keep policy/domain-heavy modules under `apps/mobile/src/organisms/<domain>/`.
