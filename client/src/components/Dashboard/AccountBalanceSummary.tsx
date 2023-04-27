import Typography from '@mui/material/Typography';

function AccountBalanceSummaryContent({ totalValue, numberOfAssets }: { totalValue: number, numberOfAssets: number }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Total Balance
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalValue}€
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Total Assets: {numberOfAssets}
      </Typography>
    </>
  );
}

export default function AccountBalanceSummary({ totalValue, numberOfAssets }: { totalValue: number, numberOfAssets: number }) {
  return <AccountBalanceSummaryContent totalValue={totalValue} numberOfAssets={numberOfAssets} />
}