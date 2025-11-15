export const codingQuestions = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    description: `Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.

You may assume that each input has exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'nums[0] + nums[1] = 2 + 7 = 9, so we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'nums[1] + nums[2] = 2 + 4 = 6, so we return [1, 2].',
      },
    ],
    testCases: [
      { input: '2\n7\n11\n15\n9', expectedOutput: '0 1' },
      { input: '3\n2\n4\n6', expectedOutput: '1 2' },
      { input: '3\n3\n0', expectedOutput: '0 1' },
    ],
  },
  {
    id: 2,
    title: 'Reverse String',
    difficulty: 'Easy',
    description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.`,
    constraints: [
      '1 <= s.length <= 10^5',
      's[i] is a printable ascii character.',
    ],
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
        explanation: 'The string "hello" reversed becomes "olleh"',
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
        explanation: 'The string "Hannah" reversed becomes "hannaH"',
      },
    ],
    testCases: [
      { input: 'hello', expectedOutput: 'olleh' },
      { input: 'Hannah', expectedOutput: 'hannaH' },
      { input: 'a', expectedOutput: 'a' },
    ],
  },
  {
    id: 3,
    title: 'Palindrome Number',
    difficulty: 'Easy',
    description: `Given an integer x, return true if x is a palindrome, and false otherwise.

An integer is a palindrome when it reads the same backward as forward.`,
    constraints: [
      '-2^31 <= x <= 2^31 - 1',
    ],
    examples: [
      {
        input: 'x = 121',
        output: 'true',
        explanation: '121 reads as 121 from left to right and from right to left.',
      },
      {
        input: 'x = -121',
        output: 'false',
        explanation: 'From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.',
      },
      {
        input: 'x = 10',
        output: 'false',
        explanation: 'Reads 01 from right to left. Therefore it is not a palindrome.',
      },
    ],
    testCases: [
      { input: '121', expectedOutput: 'true' },
      { input: '-121', expectedOutput: 'false' },
      { input: '10', expectedOutput: 'false' },
      { input: '0', expectedOutput: 'true' },
    ],
  },
  {
    id: 4,
    title: 'Fibonacci Number',
    difficulty: 'Easy',
    description: `The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.

That is:
F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.

Given n, calculate F(n).`,
    constraints: [
      '0 <= n <= 30',
    ],
    examples: [
      {
        input: 'n = 2',
        output: '1',
        explanation: 'F(2) = F(1) + F(0) = 1 + 0 = 1.',
      },
      {
        input: 'n = 3',
        output: '2',
        explanation: 'F(3) = F(2) + F(1) = 1 + 1 = 2.',
      },
      {
        input: 'n = 4',
        output: '3',
        explanation: 'F(4) = F(3) + F(2) = 2 + 1 = 3.',
      },
    ],
    testCases: [
      { input: '2', expectedOutput: '1' },
      { input: '3', expectedOutput: '2' },
      { input: '4', expectedOutput: '3' },
      { input: '5', expectedOutput: '5' },
      { input: '0', expectedOutput: '0' },
      { input: '1', expectedOutput: '1' },
    ],
  },
  {
    id: 5,
    title: 'Binary Search',
    difficulty: 'Medium',
    description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.`,
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All the integers in nums are unique.',
      'nums is sorted in ascending order.',
    ],
    examples: [
      {
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        output: '4',
        explanation: '9 exists in nums and its index is 4',
      },
      {
        input: 'nums = [-1,0,3,5,9,12], target = 13',
        output: '-1',
        explanation: '13 does not exist in nums so return -1',
      },
    ],
    testCases: [
      { input: '-1\n0\n3\n5\n9\n12\n9', expectedOutput: '4' },
      { input: '-1\n0\n3\n5\n9\n12\n13', expectedOutput: '-1' },
      { input: '5\n7\n7\n8\n11\n11\n7', expectedOutput: '1' },
    ],
  },
  {
    id: 6,
    title: 'Merge Sorted Array',
    difficulty: 'Medium',
    description: `You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of valid elements in nums1 and nums2 respectively.

Merge nums2 into nums1 as one sorted array.

Note: You may assume that nums1 has a length of m + n, that it has enough space to hold additional elements from nums2.`,
    constraints: [
      'nums1.length == m + n',
      'nums2.length == n',
      '0 <= m, n <= 200',
      '1 <= m + n <= 200',
      '-10^9 <= nums1[i], nums2[j] <= 10^9',
    ],
    examples: [
      {
        input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3',
        output: '[1,2,2,3,5,6]',
        explanation: 'The arrays we are merging are [1,2,3] and [2,5,6].',
      },
      {
        input: 'nums1 = [1], m = 1, nums2 = [], n = 0',
        output: '[1]',
        explanation: 'The arrays we are merging are [1] and an empty array [].',
      },
    ],
    testCases: [
      { input: '1\n2\n3\n2\n5\n6', expectedOutput: '1 2 2 3 5 6' },
      { input: '1', expectedOutput: '1' },
      { input: '0', expectedOutput: '0' },
    ],
  },
];

export default codingQuestions;
