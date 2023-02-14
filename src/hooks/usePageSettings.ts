import { useCallback, useState } from "react";

export interface PageSettings {
  currentPage: number;
  rowsPerPage: number;
  search: string;
  sortKey: string;
  sortOrder: number;
  from?: number | string;
  to?: number | string;
  showBlocked?: boolean;
}

export const usePageSettings = (init?: Partial<PageSettings>) => {
  const [settings, setSettings] = useState<PageSettings>({
    currentPage: 1,
    rowsPerPage: 10,
    search: "",
    sortKey: "",
    sortOrder: 1,
    from: "",
    to: "",
    ...(init || {}),
  });

  const onPageChange = useCallback(
    (pageNum: number) => setSettings({ ...settings, currentPage: pageNum }),
    [settings]
  );

  const onSizePerPage = useCallback(
    (perPage: number) => setSettings({ ...settings, rowsPerPage: perPage }),
    [settings]
  );

  const onFilterChange = useCallback(
    (search: string) => setSettings({ ...settings, search, currentPage: 1 }),
    [settings]
  );

  const onSetFrom = useCallback(
    (from: number | "") => setSettings({ ...settings, from }),
    [settings]
  );

  const onSetTo = useCallback(
    (to: number | "") => setSettings({ ...settings, to }),
    [settings]
  );

  const changeSortOrder = useCallback(
    (key: string, order: number) =>
      setSettings({ ...settings, sortKey: key, sortOrder: order }),
    [settings]
  );

  const onSortChange = useCallback(
    (column: string) => {
      if (column === settings.sortKey) {
        setSettings({
          ...settings,
          currentPage: 1,
          sortOrder: settings.sortOrder > 0 ? -1 : 1,
        });
      } else {
        setSettings({
          ...settings,
          currentPage: 1,
          sortKey: column,
          sortOrder: 1,
        });
      }
    },
    [settings]
  );

  return {
    onPageChange,
    onSizePerPage,
    onFilterChange,
    onSortChange,
    changeSortOrder,
    onSetFrom,
    onSetTo,
    settings,
  };
};
