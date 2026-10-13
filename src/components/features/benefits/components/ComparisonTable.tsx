import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComparisonTableSectionData } from "../data";

interface ComparisonTableProps {
  data: ComparisonTableSectionData;
  className?: string;
}

export function ComparisonTable({ data, className }: ComparisonTableProps) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_25px_rgba(0,0,0,0.03)]",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80">
              {/* Cột 1: Tiêu chí */}
              <th className="w-[30%] bg-slate-50/90 px-6 py-4 text-xs sm:text-sm font-semibold text-slate-500">
                {data.tableHeaders.criteria}
              </th>

              {/* Cột 2: BrightLingo (Được highlight nền xanh nhẹ) */}
              <th className="w-[38%] bg-blue-50/60 border-x border-blue-100/80 px-6 py-4">
                <div className="inline-flex items-center gap-2 text-primary font-bold text-sm sm:text-base">
                  <CheckCircle2 className="size-4.5 fill-primary text-white shrink-0" />
                  <span>{data.tableHeaders.brightLingo}</span>
                </div>
              </th>

              {/* Cột 3: Đối thủ / Truyền thống */}
              <th className="w-[32%] bg-slate-50/90 px-6 py-4 text-xs sm:text-sm font-semibold text-slate-500">
                {data.tableHeaders.competitors}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {data.rows.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-slate-50/40 transition-colors"
              >
                {/* Tiêu chí */}
                <td className="px-6 py-4 sm:py-4.5 text-xs sm:text-[13.5px] font-semibold text-slate-800">
                  {row.criteria}
                </td>

                {/* BrightLingo */}
                <td className="bg-blue-50/25 border-x border-blue-100/50 px-6 py-4 sm:py-4.5 text-xs sm:text-[13.5px] font-semibold text-primary">
                  {row.brightLingo}
                </td>

                {/* Phương pháp khác */}
                <td className="px-6 py-4 sm:py-4.5 text-xs sm:text-[13.5px] text-slate-600">
                  {row.competitors}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
