import { formatDate, getTypeLabel } from "@/lib/training-data";
import { WorkshopSummary } from "@/services/workshop/get-workshops";
import { formatPrice } from "@/utils/format-price";
import { MoreHorizontal, Presentation } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

interface WorkshopItemProps {
  workshop: WorkshopSummary;
}

const WorkshopItem = ({ workshop }: WorkshopItemProps) => {
  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    // TODO: Open dropdown / modal / action menu
    console.log("More action clicked", workshop.id);
  };

  return (
    <Link
      href={`/dashboard/workshops/${workshop.id}`}
      className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-slate-50"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
        <Presentation className="h-6 w-6 text-slate-600" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <p className="truncate font-medium text-slate-900">
            {workshop.title}
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <button
                type="button"
                onClick={handleMoreClick}
                className="rounded-md p-1 transition hover:bg-slate-200"
                aria-label="More actions"
              >
                <MoreHorizontal className="h-5 w-5 text-slate-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="text-xs text-red-500">
                Delete Workshop
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {workshop.short_description && (
          <p className="truncate text-sm text-slate-500">
            {workshop.short_description}
          </p>
        )}

        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="rounded-full bg-slate-100 px-2 py-0.5">
            {getTypeLabel("workshop")}
          </span>

          {workshop.category && (
            <span className="max-w-[120px] truncate">{workshop.category}</span>
          )}

          {workshop.created_at && (
            <span>{formatDate(workshop.created_at)}</span>
          )}

          {workshop.price && (
            <span className="font-semibold text-slate-900">
              {formatPrice(Number(workshop.price))}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default WorkshopItem;
