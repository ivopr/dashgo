import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/layout";
import theme from "@chakra-ui/theme";
import { Header, Sidebar } from "@components";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false
});

const options = {
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    foreColor: theme.colors.gray[500]
  },
  grid: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      "2021-03-18T00:00:00.000Z",
      "2021-03-19T00:00:00.000Z",
      "2021-03-20T00:00:00.000Z",
      "2021-03-21T00:00:00.000Z",
      "2021-03-22T00:00:00.000Z",
      "2021-03-23T00:00:00.000Z",
      "2021-03-24T00:00:00.000Z"
    ]
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3
    }
  }
};

const series = [{ name: "One", data: [31, 120, 10, 28, 51, 18, 109] }];

export default function Dashboard(): JSX.Element {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex maxW={1480} mx="auto" my="6" px="6" w="100%">
        <Sidebar />

        <SimpleGrid align="flex-start" flex="1" gap="4" minChildWidth="320px">
          <Box bg="gray.800" borderRadius={8} p={["6", "8"]} pb="4">
            <Text fontSize="lg" mb="4">
              Weekly Fishes
            </Text>

            <Chart height={160} options={options} series={series} type="area" />
          </Box>

          <Box bg="gray.800" borderRadius={8} p={["6", "8"]} pb="4">
            <Text fontSize="lg" mb="4">
              Monthly Fishes
            </Text>

            <Chart height={160} options={options} series={series} type="area" />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
