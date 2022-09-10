import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";

export const ToggleTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button size="lg" onClick={() => toggleColorMode()} position="absolute" bottom="15px" right="15px">
      {colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};