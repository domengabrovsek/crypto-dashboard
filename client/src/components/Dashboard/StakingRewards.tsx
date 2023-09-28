import { useEffect, useState } from 'react';
import { getStakingRewards } from "../../services/api";
import { StakingTransaction } from "../../../../shared/types/Account";
import Chart from '../Chart/Chart';

export default function StakingRewards() {

  const [stakingRewards, setStakingRewards] = useState<StakingTransaction[]>([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      let data = await getStakingRewards();

      data.forEach((item: any) => {
        item.date = new Date(item.date);
      });
      
      data.sort((a: any, b: any) => a.date - b.date);

      setStakingRewards(data);
    };

    fetchDataAsync();
  }, []);

  if (!stakingRewards || stakingRewards.length === 0) {
    return <p>Loading...</p>
  }

  return (
    <Chart
      data={stakingRewards}
    />
  );
}


