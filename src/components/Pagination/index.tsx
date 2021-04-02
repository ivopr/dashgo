import { Box, Stack } from "@chakra-ui/react";

import { Item } from "./Item";

export function Pagination(): JSX.Element {
  return (
    <Stack align="center" direction="row" justify="space-between" mt="8" spacing="6">
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
        <Item isCurrent number={1} />
        <Item number={2} />
        <Item number={3} />
        <Item number={4} />
      </Stack>
    </Stack>
  );
}
