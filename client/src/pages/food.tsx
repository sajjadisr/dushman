import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MobileHeader from "@/components/layout/mobile-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Utensils, Trash2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import FoodLoggingModal from "@/components/food/food-logging-modal";

export default function Food() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // Mock user ID - in a real app, this would come from authentication
  const userId = "mock-user-id";
  const today = new Date().toISOString().split('T')[0];

  const { data: foods = [], isLoading: foodsLoading } = useQuery({
    queryKey: ["/api/foods", searchQuery],
    enabled: searchQuery.length > 0,
  });

  const { data: foodEntries = [], isLoading: entriesLoading } = useQuery({
    queryKey: ["/api/food-entries", userId, today],
  });

  const deleteFoodEntryMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/food-entries/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/food-entries", userId, today] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard-stats"] });
      toast({ description: "وعده غذایی حذف شد" });
    },
  });

  const totalCalories = foodEntries.reduce((sum: number, entry: any) => {
    return sum + (entry.food?.caloriesPerServing * entry.servings || 0);
  }, 0);

  const groupedEntries = foodEntries.reduce((groups: any, entry: any) => {
    const mealType = entry.mealType;
    if (!groups[mealType]) {
      groups[mealType] = [];
    }
    groups[mealType].push(entry);
    return groups;
  }, {});

  const mealTypes = ["صبحانه", "ناهار", "شام", "میان‌وعده"];

  return (
    <div className="pb-20">
      <MobileHeader />
      
      <main className="px-4 py-6">
        {/* Daily Calorie Summary */}
        <Card className="p-4 mb-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">کالری امروز</h2>
            <div className="text-3xl font-bold text-primary mb-1">{totalCalories}</div>
            <div className="text-sm text-gray-500">از 2000 کالری</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div 
                className="bg-gradient-to-l from-primary to-secondary h-2 rounded-full transition-all"
                style={{ width: `${Math.min((totalCalories / 2000) * 100, 100)}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Quick Add Button */}
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="w-full mb-6 h-12 text-lg"
          data-testid="button-add-food"
        >
          <Plus className="ml-2 h-5 w-5" />
          افزودن غذا
        </Button>

        {/* Search Foods */}
        <div className="relative mb-6">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="جستجو غذا..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
            data-testid="input-search-food"
          />
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">نتایج جستجو</h3>
            {foodsLoading ? (
              <div className="text-center py-4">در حال بارگذاری...</div>
            ) : foods.length > 0 ? (
              <div className="space-y-2">
                {foods.map((food: any) => (
                  <Card key={food.id} className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{food.name}</h4>
                        <p className="text-sm text-gray-600">{food.caloriesPerServing} کالری در {food.servingSize}</p>
                        <Badge variant="outline" className="mt-1">{food.category}</Badge>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => {/* TODO: Add to today's meals */}}
                        data-testid={`button-add-${food.id}`}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">غذایی یافت نشد</div>
            )}
          </div>
        )}

        {/* Today's Meals by Type */}
        {mealTypes.map((mealType) => (
          <div key={mealType} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Utensils className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">{mealType}</h3>
            </div>
            
            {groupedEntries[mealType]?.length > 0 ? (
              <div className="space-y-2">
                {groupedEntries[mealType].map((entry: any) => (
                  <Card key={entry.id} className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{entry.food?.name}</h4>
                        <p className="text-sm text-gray-600">
                          {entry.servings} × {entry.food?.servingSize}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-lg font-bold text-primary">
                            {entry.food?.caloriesPerServing * entry.servings}
                          </span>
                          <span className="text-sm text-gray-500">کالری</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteFoodEntryMutation.mutate(entry.id)}
                        className="text-red-500 hover:text-red-700"
                        data-testid={`button-delete-${entry.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-4 text-center text-gray-500">
                هنوز غذایی ثبت نشده
              </Card>
            )}
          </div>
        ))}
      </main>

      <FoodLoggingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={userId}
      />
    </div>
  );
}
