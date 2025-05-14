// utils/statusVariant.ts
export function statusToBadgeVariant(status: string) {
  switch (status) {
    case "모집 예정": return "statusUpcoming";
    case "모집 중":   return "statusOpen";
    case "모집 완료": return "statusClosed";
    case "종료":     return "statusEnded";
    default:         return "default";
  }
}
