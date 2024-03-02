"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";

const InputSearch = () => {
  return (
    <form className="flex items-center gap-2">
      <Input placeholder="Busque por uma barbearia" />
      <Button type="submit" variant={"default"} size={"icon"}>
        <SearchIcon size={20} />
      </Button>
    </form>
  );
};

export default InputSearch;
