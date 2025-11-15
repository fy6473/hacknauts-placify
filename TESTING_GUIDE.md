# 🧪 Testing Guide - Code Compiler & Technical Round

## Quick Test Flow

### Step 1: Create Test Account
```
Email: compiler_test@example.com
Password: Test123!
Name: Compiler Tester
College: Test College
```

### Step 2: Access Technical Round
1. Open: http://localhost:5173
2. Click "Sign Up" → Fill details → Create account
3. You'll be logged in automatically
4. Click "💻 Coding Test" button in header

### Step 3: Start Test
1. Read test instructions
2. Click "🚀 Start Test"
3. Select language from dropdown

### Step 4: Test Each Language

#### Test 1: Python
```python
# Problem: Two Sum
# Write code to find two indices

n = int(input())
arr = []
for _ in range(n):
    arr.append(int(input()))
target = int(input())

for i in range(len(arr)):
    for j in range(i+1, len(arr)):
        if arr[i] + arr[j] == target:
            print(i, j)
            break
```
- Input: 4 / 2 / 7 / 11 / 15 / 9
- Expected: 0 1

#### Test 2: JavaScript
```javascript
// Problem: Reverse String

const input = prompt("Enter string:");
const reversed = input.split('').reverse().join('');
console.log(reversed);
```

#### Test 3: Java (Optional)
```java
public class Solution {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

### Step 5: Test Code Execution

1. **Run Simple Code**:
   - Write: `print("Hello World")`
   - Click "▶️ Run Code"
   - See output: Hello World

2. **Run With Input**:
   - Write: 
     ```python
     n = int(input())
     print(n * 2)
     ```
   - Enter input: 5
   - Click "▶️ Run Code"
   - Expected output: 10

3. **Run Test Cases**:
   - Select problem
   - Click "🧪 Run Test Cases"
   - See pass/fail for each test case

### Step 6: Submit Solution
1. After writing code, click "✅ Submit Solution"
2. You'll move to next question
3. Continue with other problems

### Step 7: Finish Test
1. Solve questions or click "🏁 Finish Test"
2. See results: X/6 problems solved
3. Option to "🔄 Retake Test" or "🏠 Back to Home"

---

## ✅ Verification Checklist

### Frontend Features:
- [ ] Header shows "💻 Coding Test" button when logged in
- [ ] Header hides button when logged out
- [ ] Click test button takes to /technical route
- [ ] Test instructions display correctly
- [ ] Can start test with button
- [ ] Questions sidebar shows all 6 problems
- [ ] Language dropdown shows all 5 languages
- [ ] Can select different languages

### Code Editor:
- [ ] Syntax highlighting works for all languages
- [ ] Can type and edit code
- [ ] Line numbers display
- [ ] Tab key works (indentation)
- [ ] Code persists while switching problems

### Compiler:
- [ ] "▶️ Run Code" button works
- [ ] Output displays correctly
- [ ] Error messages show for syntax errors
- [ ] Input field accepts user input
- [ ] Execution time shows
- [ ] Works for Python
- [ ] Works for JavaScript
- [ ] Works for Java
- [ ] Works for C++
- [ ] Works for C

### Test Cases:
- [ ] "🧪 Run Test Cases" button appears
- [ ] Test cases run one by one
- [ ] Shows PASSED/FAILED for each
- [ ] Displays input/expected/actual output
- [ ] Color coding (green for pass, red for fail)
- [ ] Count shows "X/6 passed"

### Problems:
- [ ] All 6 problems display correctly
- [ ] Problem title shows
- [ ] Description shows
- [ ] Difficulty badge shows
- [ ] Examples display with input/output
- [ ] Can click "Start Coding" button
- [ ] Can navigate between problems with sidebar

### Timer & Progress:
- [ ] 60-minute timer counts down
- [ ] Timer is visible
- [ ] Solved counter updates
- [ ] Can see solved vs unsolved in sidebar
- [ ] Green checkmark for solved
- [ ] Empty circle for unsolved

### Results:
- [ ] Results page shows after finishing
- [ ] Score displays (X/6)
- [ ] List of solved problems shows ✅
- [ ] List of unsolved problems shows ❌
- [ ] "🔄 Retake Test" button works
- [ ] "🏠 Back to Home" button works

---

## 🐛 Common Issues & Fixes

### Issue: "Network Error" when running code
**Fix**: Check backend is running: `npm start` in placify-backend folder

### Issue: Code doesn't execute
**Fix**: 
- Check syntax is correct
- Ensure input format matches problem requirements
- Try simple code first: `print("Hello")`

### Issue: Test Cases not showing
**Fix**: Click "🧪 Run Test Cases" button (not "▶️ Run Code")

### Issue: Timer not counting down
**Fix**: Refresh page and start test again

### Issue: Can't access technical test
**Fix**: Make sure you're logged in. Click "Sign In" first.

---

## 📊 Sample Test Session

```
TEST SESSION STARTED
===================
User: compiler_test@example.com
Time: 00:59:45 (counting down)
Problems: 6 total

Question 1: Two Sum (Easy)
- Read problem ✓
- Select Python ✓
- Write solution ✓
- Run test cases: 2/2 passed ✓
- Submit ✓

Question 2: Reverse String (Easy)
- Read problem ✓
- Select JavaScript ✓
- Write solution ✓
- Test output ✓
- Submit ✓

[Continue for other problems...]

TEST RESULTS
============
Score: 6/6 ✅
All problems solved!
Time taken: 45 minutes
Languages used: Python, JavaScript, Java
```

---

## 🎯 Expected Behavior

### Correct Test Case:
```
Test Case #1: PASSED ✅
Input: 2 7 11 15 target=9
Expected: 0 1
Got: 0 1
Status: GREEN ✓
```

### Failed Test Case:
```
Test Case #2: FAILED ❌
Input: 3 2 4 target=6
Expected: 1 2
Got: 0 1
Status: RED ✗
```

---

## 📌 Notes

- Each problem has 1-3 test cases
- Output must match exactly (spaces matter!)
- Can switch languages mid-test
- Progress auto-saves in browser
- Timer auto-submits if time expires
- Can retake test unlimited times

---

**Ready to test! Open http://localhost:5173 and start the coding round!**
