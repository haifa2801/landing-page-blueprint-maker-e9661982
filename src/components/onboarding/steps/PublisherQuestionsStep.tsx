
import React from "react";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/input";

interface PublisherQuestionsStepProps {
  publisherSize: "small" | "medium" | "large" | undefined;
  onPublisherSizeChange: (size: "small" | "medium" | "large") => void;
  catalogTypes: string[];
  onCatalogTypesChange: (types: string[]) => void;
  specificNeeds: string[];
  onSpecificNeedsChange: (needs: string[]) => void;
}

export function PublisherQuestionsStep({
  publisherSize,
  onPublisherSizeChange,
  catalogTypes,
  onCatalogTypesChange,
  specificNeeds,
  onSpecificNeedsChange,
}: PublisherQuestionsStepProps) {
  
  const handleCatalogTypeChange = (type: string) => {
    if (catalogTypes.includes(type)) {
      onCatalogTypesChange(catalogTypes.filter(t => t !== type));
    } else {
      onCatalogTypesChange([...catalogTypes, type]);
    }
  };

  const handleNeedChange = (need: string) => {
    if (specificNeeds.includes(need)) {
      onSpecificNeedsChange(specificNeeds.filter(n => n !== need));
    } else {
      onSpecificNeedsChange([...specificNeeds, need]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <h4 className="font-medium text-lg">Quelle est la taille de votre maison d'édition ?</h4>
        <RadioGroup 
          value={publisherSize} 
          onValueChange={(value) => onPublisherSizeChange(value as "small" | "medium" | "large")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="small" id="size-small" />
            <Label htmlFor="size-small">Petite (moins de 10 titres par an)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="size-medium" />
            <Label htmlFor="size-medium">Moyenne (10-50 titres par an)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="large" id="size-large" />
            <Label htmlFor="size-large">Grande (plus de 50 titres par an)</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium text-lg">Types d'ouvrages dans votre catalogue</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="catalog-fiction" 
              checked={catalogTypes.includes("fiction")}
              onCheckedChange={() => handleCatalogTypeChange("fiction")} 
            />
            <Label htmlFor="catalog-fiction">Fiction</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="catalog-nonfiction" 
              checked={catalogTypes.includes("nonfiction")}
              onCheckedChange={() => handleCatalogTypeChange("nonfiction")} 
            />
            <Label htmlFor="catalog-nonfiction">Non-fiction</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="catalog-academic" 
              checked={catalogTypes.includes("academic")}
              onCheckedChange={() => handleCatalogTypeChange("academic")} 
            />
            <Label htmlFor="catalog-academic">Publications académiques</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="catalog-illustrated" 
              checked={catalogTypes.includes("illustrated")}
              onCheckedChange={() => handleCatalogTypeChange("illustrated")} 
            />
            <Label htmlFor="catalog-illustrated">Livres illustrés</Label>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium text-lg">Besoins spécifiques</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="need-rights" 
              checked={specificNeeds.includes("rights")}
              onCheckedChange={() => handleNeedChange("rights")} 
            />
            <Label htmlFor="need-rights">Gestion avancée des droits</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="need-api" 
              checked={specificNeeds.includes("api")}
              onCheckedChange={() => handleNeedChange("api")} 
            />
            <Label htmlFor="need-api">Intégration API</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="need-bulk" 
              checked={specificNeeds.includes("bulk")}
              onCheckedChange={() => handleNeedChange("bulk")} 
            />
            <Label htmlFor="need-bulk">Importation massive de catalogue</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="need-analytics" 
              checked={specificNeeds.includes("analytics")}
              onCheckedChange={() => handleNeedChange("analytics")} 
            />
            <Label htmlFor="need-analytics">Analytics avancés</Label>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
