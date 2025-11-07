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
import { useProfile, type TableHeaders } from '@/contexts/ProfileContext';
import type { Asset } from '@/contexts/ProfileContext';
import { Plus, Trash2 } from 'lucide-react';


interface AssetsTableProps {
  assets: Asset[];
}

const AssetsTable = ({ assets }: AssetsTableProps) => {
  const { t } = useLanguage();
  const { updateAsset, addAsset, deleteAsset, currentProfile, updateTableHeaders } = useProfile();

  const defaultHeaders: TableHeaders = {
    asset: t('asset'),
    date: t('date'),
    amountCZK: t('amountCZK'),
    amountEUR: t('amountEUR'),
    notes: 'Notes',
    assetValue: t('assetValue'),
  };

  const headers = currentProfile?.tableHeaders || defaultHeaders;

  const handleCellChange = (index: number, field: keyof Asset, value: string) => {
    const updatedAsset = { ...assets[index], [field]: value };
    updateAsset(index, updatedAsset);
  };

  const handleHeaderChange = (field: keyof TableHeaders, value: string) => {
    const updatedHeaders = { ...headers, [field]: value };
    updateTableHeaders(updatedHeaders);
  };

  const handleAddRow = () => {
    const newAsset: Asset = {
      name: 'New Asset',
      date: new Date().toLocaleDateString('cs-CZ'),
      amountCZK: '0 CZK',
      amountEUR: '0€',
      notes: 'X',
      assetValue: '0 CZK',
    };
    addAsset(newAsset);
  };

  const handleDeleteRow = (index: number) => {
    deleteAsset(index);
  };

  return (
    <Card className="p-6 bg-card/50 border-border/50 overflow-hidden backdrop-blur-sm">
      <div className="flex justify-end items-center mb-4">
        <Button 
          onClick={handleAddRow}
          variant="outline"
          size="sm"
          className="gap-2 border-primary/30 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Row
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium w-[200px]">
                <Input
                  value={headers.asset}
                  onChange={(e) => handleHeaderChange('asset', e.target.value)}
                  className="border-0 bg-transparent px-2 py-1 h-8 font-medium text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
                />
              </TableHead>
              <TableHead className="text-muted-foreground font-medium text-right w-[140px]">
                <Input
                  value={headers.amountCZK}
                  onChange={(e) => handleHeaderChange('amountCZK', e.target.value)}
                  className="border-0 bg-transparent px-2 py-1 h-8 font-medium text-muted-foreground text-right focus-visible:ring-1 focus-visible:ring-primary"
                />
              </TableHead>
              <TableHead className="text-muted-foreground font-medium text-right w-[140px]">
                <Input
                  value={headers.amountEUR}
                  onChange={(e) => handleHeaderChange('amountEUR', e.target.value)}
                  className="border-0 bg-transparent px-2 py-1 h-8 font-medium text-muted-foreground text-right focus-visible:ring-1 focus-visible:ring-primary"
                />
              </TableHead>
              <TableHead className="text-muted-foreground font-medium text-center">
                <Input
                  value={headers.notes}
                  onChange={(e) => handleHeaderChange('notes', e.target.value)}
                  className="border-0 bg-transparent px-2 py-1 h-8 font-medium text-muted-foreground text-center focus-visible:ring-1 focus-visible:ring-primary"
                />
              </TableHead>
              <TableHead className="text-muted-foreground font-medium text-right w-[140px]">
                <Input
                  value={headers.assetValue}
                  onChange={(e) => handleHeaderChange('assetValue', e.target.value)}
                  className="border-0 bg-transparent px-2 py-1 h-8 font-medium text-muted-foreground text-right focus-visible:ring-1 focus-visible:ring-primary"
                />
              </TableHead>
              <TableHead className="text-muted-foreground font-medium text-center w-[60px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset, index) => (
              <TableRow key={index} className="border-border/50 hover:bg-primary/5 transition-colors">
                <TableCell className="font-normal text-foreground">
                  <Input
                    value={asset.name}
                    onChange={(e) => handleCellChange(index, 'name', e.target.value)}
                    className="border-0 bg-transparent px-2 py-1 h-8 focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </TableCell>
                <TableCell className="text-right text-foreground">
                  <Input
                    value={asset.amountCZK}
                    onChange={(e) => handleCellChange(index, 'amountCZK', e.target.value)}
                    className="border-0 bg-transparent px-2 py-1 h-8 text-right focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </TableCell>
                <TableCell className="text-right text-primary font-medium">
                  <Input
                    value={asset.amountEUR}
                    onChange={(e) => handleCellChange(index, 'amountEUR', e.target.value)}
                    className="border-0 bg-transparent px-2 py-1 h-8 text-right focus-visible:ring-1 focus-visible:ring-primary text-primary"
                  />
                </TableCell>
                <TableCell className="text-center text-muted-foreground">
                  <Input
                    value={asset.notes}
                    onChange={(e) => handleCellChange(index, 'notes', e.target.value)}
                    className="border-0 bg-transparent px-2 py-1 h-8 text-center focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </TableCell>
                <TableCell className="text-right font-medium text-foreground">
                  <Input
                    value={asset.assetValue}
                    onChange={(e) => handleCellChange(index, 'assetValue', e.target.value)}
                    className="border-0 bg-transparent px-2 py-1 h-8 text-right focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteRow(index)}
                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive transition-colors"
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