const actionCreator = (action: string, ...actionDataParameters: string[]) => (
  ...actionData: any[]
) => ({
  action,
  ...actionDataParameters.reduce(
    (builtParams: any, key: string, index: number) => ({
      ...builtParams,
      [key]: actionData[index],
    }),
    {}
  ),
});

const TEST_ACTION = actionCreator("TEST_ACTION", "test");

export { TEST_ACTION };
