### 1. The interface declarations are not reasonable:

- **Issue:** The `WalletBalance` interface lacks `blockchain` field. The `FormattedWalletBalance` interface is similar to the WalletBalance interface and can be written in an extended style.
- **Improvement:**
  Add the `blockchain` field to the `WalletBalance` interface, and write `FormattedWalletBalance` which extends `WalletBalance`

### 2. getPriority function is a bit long:

- **Issue:** Using a switch case in this case may be unnecessary and ineffective.
- **Improvement:** Using a JavaScript `object` instead of a long switch and using map to map the `blockchain` with the corresponding priority.

### 3. The sortedBalances function has incorrect logic and is quite confusing:

- **Issue:** The variable `lhsPriority` is not declared but is used. The condition `balance.amount <= 0` is not reasonable. The conditions used for comparison are too long
- **Improvement:** Delete the `lhsPriority` variable and edit the conditions so they make sense.

### 4. formattedBalances function is not effective:

- **Issue:** The `formattedBalances` function will be recalculated even if it is not needed.
- **Improvement:** Use `useMemo` with the `formattedBalances` function to recalculate only when sortedBalances changes.

### 5. usdValue calculation may encounter errors:

- **Issue:** Calculation `usdValue = prices[balance.currency] * balance.amount;` may cause error if `prices[balance.currency]` is `undefined`.
- **Improvement:** Need to check the value of `prices[balance.currency]` before calculating.
