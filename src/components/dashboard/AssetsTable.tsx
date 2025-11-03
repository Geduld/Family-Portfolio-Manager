import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Asset } from '@/contexts/ProfileContext';

interface AssetsTableProps {
  assets: Asset[];
}

const AssetsTable = ({ assets }: AssetsTableProps) => {
  const { t } = useLanguage();

  return (
    <Card className="p-6 bg-card border-border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">{t('asset')}</TableHead>
              <TableHead className="text-muted-foreground font-medium">{t('shortCode')}</TableHead>
              <TableHead className="text-muted-foreground font-medium">{t('date')}</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">{t('amountCZK')}</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">{t('amountEUR')}</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">{t('estimatedValue')}</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">{t('assetValue')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset, index) => (
              <TableRow key={index} className="border-border hover:bg-accent/50 transition-colors">
                <TableCell className="font-normal text-foreground">{asset.name}</TableCell>
                <TableCell className="text-muted-foreground">{asset.shortCode}</TableCell>
                <TableCell className="text-muted-foreground">{asset.date}</TableCell>
                <TableCell className="text-right text-foreground">{asset.amountCZK}</TableCell>
                <TableCell className="text-right text-primary">{asset.amountEUR}</TableCell>
                <TableCell className="text-right text-muted-foreground">{asset.estimatedValue}</TableCell>
                <TableCell className="text-right font-medium text-foreground">{asset.assetValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default AssetsTable;
