import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProfile } from '@/contexts/ProfileContext';
import type { Asset } from '@/contexts/ProfileContext';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AssetsTableProps {
  assets: Asset[];
}

const AssetsTable = ({ assets }: AssetsTableProps) => {
  const { t } = useLanguage();
  const { updateAsset, addAsset, deleteAsset } = useProfile();
  const { toast } = useToast();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleCellChange = (index: number, field: keyof Asset, value: string) => {
    const updatedAsset = { ...assets[index], [field]: value };
    updateAsset(index, updatedAsset);
  };

  const handleAddRow = () => {
    const newAsset: Asset = {
      name: 'New Asset',
      shortCode: 'NEW',
      date: new Date().toLocaleDateString('cs-CZ'),
      amountCZK: '0 CZK',
      amountEUR: '0€',
      estimatedValue: 'X',
      assetValue: '0 CZK',
    };
    addAsset(newAsset);
    toast({
      title: t('success'),
      description: 'New asset row added',
    });
  };

  const handleDeleteRow = (index: number) => {
    deleteAsset(index);
    toast({
      title: t('success'),
      description: 'Asset deleted',
    });
  };

  return (
    <Card className="p-6 bg-card border-border overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-light text-foreground">{t('assets')}</h3>
        <Button 
          onClick={handleAddRow}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Row
        </Button>
      </div>
      
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
              <TableHead className="text-muted-foreground font-medium text-center w-[60px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset, index) => (
              <TableRow key={index} className="border-border hover:bg-accent/50 transition-colors">
                <TableCell className="font-normal text-foreground">
                  <Input
                    value={asset.name}
                    onChange={(e) => handleCellChange(index, 'name', e.target.value)}
                    className="border-0 bg-transparent px-2 py-1 h-8 focus-visible:ring-1"
                  />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <Input
                    value={asset.shortCode}
                    onChange={(e) => handleCellChange(index, 'shortCode', e.target.value)}
                    className="border-0 bg-transparent px-2 py-1 h-8 focus-visible:ring-1"
                  />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <Input
                    value={asset.date}
                    onChange={(e) => handleCellChange(index, 'date', e.target.value)}
                    className="border-0 bg-transparent px-2 py-1 h-8 focus-visible:ring-1"
                  />
                </TableCell>
                <TableCell className="text-right text-foreground">
                  <Input
                    value={asset.amountCZK}
                    onChange={(e) => handleCellChange(index, 'amountCZK', e.target.value)}
                    className="border-0 bg-transparent px-2 py-1 h-8 text-right focus-visible:ring-1"
                  />
                </TableCell>
                <TableCell className="text-right text-primary">
                  <Input
                    value={asset.amountEUR}
                    onChange={(e) => handleCellChange(index, 'amountEUR', e.target.value)}
                    className="border-0 bg-transparent px-2 py-1 h-8 text-right focus-visible:ring-1"
                  />
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  <Input
                    value={asset.estimatedValue}
                    onChange={(e) => handleCellChange(index, 'estimatedValue', e.target.value)}
                    className="border-0 bg-transparent px-2 py-1 h-8 text-right focus-visible:ring-1"
                  />
                </TableCell>
                <TableCell className="text-right font-medium text-foreground">
                  <Input
                    value={asset.assetValue}
                    onChange={(e) => handleCellChange(index, 'assetValue', e.target.value)}
                    className="border-0 bg-transparent px-2 py-1 h-8 text-right focus-visible:ring-1"
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteRow(index)}
                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default AssetsTable;