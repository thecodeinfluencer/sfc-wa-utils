export default function getFilteredRows(
  data: any[],
  searchInput: string
): any[] {
  if (!Array.isArray(data)) return [];

  return (
    data
      ?.map((obj: any, idx: number) => ({ ...obj, id: idx + 1 }))
      ?.map((r: any, idx: number) => ({ ...r, idx }))
      ?.filter((row: any) =>
        Object.values(row).some(
          value =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchInput?.toLowerCase())
        )
      ) || []
  );
}
