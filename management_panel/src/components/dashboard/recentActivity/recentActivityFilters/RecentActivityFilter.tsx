import React from 'react';
import { NFTCard } from '@app/components/dashboard/common/NFTCard/NFTCard';
import { RecentActivityStatusFilter } from '@app/components/dashboard/recentActivity/recentActivityFilters/RecentActivityStatusFilter/RecentActivityStatusFilter';
import { RecentActivityFilterState } from '@app/components/dashboard/recentActivity/RecentActivity';

interface RecentActivityFilterProps {
  filters: RecentActivityFilterState;
  setFilters: (func: (state: RecentActivityFilterState) => RecentActivityFilterState) => void;
  withWrapper?: boolean;
}

export const RecentActivityFilter: React.FC<RecentActivityFilterProps> = ({ filters, setFilters, withWrapper }) => {
  const filter = <RecentActivityStatusFilter filters={filters} setFilters={setFilters} />;

  return withWrapper ? <NFTCard>{filter}</NFTCard> : filter;
};
