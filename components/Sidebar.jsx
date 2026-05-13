import StarRating from "./StarRating";
import SidebarTopFixes from "./SidebarTopFixes";
import SidebarNewsletter from "./SidebarNewsletter";
import SidebarSearch from "./SidebarSearch";

export default function Sidebar({ slug }) {
  return (
    <aside className="space-y-4">
      <SidebarSearch />
      <StarRating slug={slug} />
      <SidebarTopFixes />
      <SidebarNewsletter />
    </aside>
  );
}
