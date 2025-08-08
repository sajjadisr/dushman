import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";

interface FoodLoggingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export default function FoodLoggingModal({ isOpen, onClose, userId }: FoodLoggingModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("ناهار");
  const [servings, setServings] = useState("1");
  const queryClient = useQueryClient();

  const { data: foods = [], isLoading } = useQuery({
    queryKey: ["/api/foods", searchQuery],
    enabled: searchQuery.length > 0,
  });

  const { data: popularFoods = [] } = useQuery({
    queryKey: ["/api/foods"],
  });

  const addFoodEntryMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/food-entries", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/food-entries"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard-stats"] });
      toast({ description: "وعده غذایی ثبت شد" });
      onClose();
    },
  });

  const handleAddFood = (foodId: string) => {
    const servingAmount = parseFloat(servings) || 1;
    
    addFoodEntryMutation.mutate({
      userId,
      foodId,
      servings: servingAmount,
      mealType: selectedMealType,
    });
  };

  const handleClose = () => {
    setSearchQuery("");
    setServings("1");
    onClose();
  };

  const displayFoods = searchQuery.length > 0 ? foods : popularFoods.slice(0, 6);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-hidden p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>افزودن غذا</DialogTitle>
        </DialogHeader>
        
        <div className="p-4 overflow-y-auto flex-1">
          {/* Meal Type Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">نوع وعده</label>
            <Select value={selectedMealType} onValueChange={setSelectedMealType}>
              <SelectTrigger data-testid="select-meal-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="صبحانه">صبحانه</SelectItem>
                <SelectItem value="ناهار">ناهار</SelectItem>
                <SelectItem value="شام">شام</SelectItem>
                <SelectItem value="میان‌وعده">میان‌وعده</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Servings Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">تعداد سرو</label>
            <Input
              type="number"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              min="0.1"
              step="0.1"
              placeholder="1"
              data-testid="input-servings"
            />
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="جستجو غذا..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
              data-testid="input-search-modal"
            />
          </div>

          {/* Food List */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              {searchQuery ? "نتایج جستجو" : "غذاهای محبوب"}
            </h3>
            
            {isLoading ? (
              <div className="text-center py-4">در حال بارگذاری...</div>
            ) : displayFoods.length > 0 ? (
              <div className="space-y-2 mb-6">
                {displayFoods.map((food: any) => (
                  <div 
                    key={food.id}
                    className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{food.name}</h4>
                      <p className="text-sm text-gray-600">
                        {food.caloriesPerServing} کالری در {food.servingSize}
                      </p>
                      <Badge variant="outline" className="mt-1">{food.category}</Badge>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => handleAddFood(food.id)}
                      disabled={addFoodEntryMutation.isPending}
                      className="text-primary hover:text-primary/80"
                      data-testid={`button-add-food-${food.id}`}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                {searchQuery ? "غذایی یافت نشد" : "غذایی موجود نیست"}
              </div>
            )}
          </div>

          {/* Add Custom Food Button */}
          <Button 
            variant="outline" 
            className="w-full border-dashed border-2"
            data-testid="button-add-custom-food"
          >
            <Plus className="ml-2 h-4 w-4" />
            افزودن غذای سفارشی
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
