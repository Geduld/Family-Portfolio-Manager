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
import { useToast } from '@/hooks/use-toast';

interface AssetsTableProps {
  assets: Asset[];
}

const AssetsTable = ({ assets }: AssetsTableProps) => {
  const { t } = useLanguage();
  const { updateAsset, addAsset, deleteAsset, currentProfile, updateTableHeaders } = useProfile();
  const { toast } = useToast();

  const defaultHeaders: TableHeaders = {
    asset: t('asset'),
    shortCode: t('shortCode'),
    date: t('date'),
    amountCZK: t('amountCZK'),
    amountEUR: t('amountEUR'),
    estimatedValue: t('estimatedValue'),
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
      <div className="flex justify-end items-center mb-4">
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
              <TableHead className="text-muted-foreground font-medium">
                <Input
                  value={headers.asset}
                  onChange={(e) => handleHeaderChange('asset', e.target.value)}
                  className="border-0 bg-transparent px-2 py-1 h-8 font-medium text-muted-foreground focus-visible:ring-1"
                />
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                <Input
                  value={headers.shortCode}
                  onChange={(e) => handleHeaderChange('shortCode', e.target.value)}
                  className="border-0 bg-transparent px-2 py-1 h-8 font-medium text-muted-foreground focus-visible:ring-1"
                />
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                <Input
                  value={headers.date}
                  onChange={(e) => handleHeaderChange('date', e.target.value)}
                  className="border-0 bg-transparent px-2 py-1 h-8 font-medium text-muted-foreground focus-visible:ring-1"
                />
              </TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">
                <Input
                  value={headers.amountCZK}
                  onChange={(e) => handleHeaderChange('amountCZK', e.target.value)}
                  className="border-0 bg-transparent px-2 py-1 h-8 font-medium text-muted-foreground text-right focus-visible:ring-1"
                />
              </TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">
                <Input
                  value={headers.amountEUR}
                  onChange={(e) => handleHeaderChange('amountEUR', e.target.value)}
                  className="border-0 bg-transparent px-2 py-1 h-8 font-medium text-muted-foreground text-right focus-visible:ring-1"
                />
              </TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">
                <Input
                  value={headers.estimatedValue}
                  onChange={(e) => handleHeaderChange('estimatedValue', e.target.value)}
                  className="border-0 bg-transparent px-2 py-1 h-8 font-medium text-muted-foreground text-right focus-visible:ring-1"
                />
              </TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">
                <Input
                  value={headers.assetValue}
                  onChange={(e) => handleHeaderChange('assetValue', e.target.value)}
                  className="border-0 bg-transparent px-2 py-1 h-8 font-medium text-muted-foreground text-right focus-visible:ring-1"
                />
              </TableHead>
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