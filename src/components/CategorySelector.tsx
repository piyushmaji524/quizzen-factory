
import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { quizCategories } from '@/data/categories';

interface CategorySelectorProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

const CategorySelector = ({ onCategorySelect, selectedCategory }: CategorySelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const commandRef = useRef<HTMLDivElement>(null);

  // Filter categories based on search value
  const filteredCategories = searchValue 
    ? quizCategories.filter(category => 
        category.toLowerCase().includes(searchValue.toLowerCase()))
    : quizCategories;

  // Close popover when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCategorySelect('');
  };

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-12 px-4 bg-white/70 backdrop-blur-sm"
          >
            {selectedCategory ? (
              <div className="flex items-center justify-between w-full">
                <span>{selectedCategory}</span>
                <X 
                  className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" 
                  onClick={clearSelection}
                />
              </div>
            ) : (
              <span className="text-muted-foreground">Select a category...</span>
            )}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="p-0 w-full min-w-[320px]" 
          align="start"
          ref={commandRef}
        >
          <Command>
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandInput 
                placeholder="Search categories..." 
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                value={searchValue}
                onValueChange={setSearchValue}
              />
            </div>
            <CommandList>
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-auto">
                {filteredCategories.map((category) => (
                  <CommandItem
                    key={category}
                    value={category}
                    onSelect={() => {
                      onCategorySelect(category);
                      setOpen(false);
                      setSearchValue('');
                    }}
                    className="flex items-center"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCategory === category ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {category}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CategorySelector;
