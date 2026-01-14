/**
 * Mock AI Service for PyTutor ITS
 * This simulates the CodeT5+ model responses before integration
 */

import { Message, Challenge } from '@/types';

export class MockAIService {
  private responses: Record<string, string> = {
    // Loop-related responses
    'loop': `I see you're working with loops! Let me explain the common issues:

**Common Loop Errors:**
1. **Off-by-one errors**: Using \`range(n)\` vs \`range(n+1)\`
2. **Infinite loops**: Missing or incorrect loop conditions
3. **Index out of range**: Accessing elements beyond list boundaries

Let's analyze your code step-by-step. What specific issue are you encountering?`,

    'list': `Working with Python lists, I see! Here's what might be causing issues:

**Common List Problems:**
1. **Index errors**: \`list[i]\` where \`i >= len(list)\`
2. **Modifying while iterating**: Changing list size during iteration
3. **Reference vs Copy**: Using \`=\` instead of \`copy()\`

\`\`\`python
# Wrong
my_list = original_list  # Reference

# Right
my_list = original_list.copy()  # Independent copy
\`\`\`

Would you like me to review your specific code?`,

    'function': `Let's debug this function together!

**Common Function Issues:**
1. **Missing return statement**: Function returns \`None\` implicitly
2. **Variable scope**: Using local variables incorrectly
3. **Parameter mismatch**: Wrong number or type of arguments

\`\`\`python
def calculate_sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return total  # Don't forget this!
\`\`\`

Share your function code and I'll help identify the bug!`,

    'syntax': `Syntax errors can be tricky! Let me help you identify the issue.

**Most Common Syntax Errors:**
1. **Missing colons**: \`if condition\` → \`if condition:\`
2. **Incorrect indentation**: Python requires consistent spacing
3. **Mismatched brackets**: \`[\`, \`{\`, \`(\` must be closed properly
4. **Invalid variable names**: Can't start with numbers or use keywords

\`\`\`python
# Wrong
if x > 10
    print("Large")

# Right
if x > 10:
    print("Large")
\`\`\`

Paste your code and I'll spot the syntax error!`,

    'default': `Hello! I'm PyTutor AI, your intelligent debugging assistant. 🤖

I'm here to help you:
- **Debug Python code** with step-by-step explanations
- **Understand errors** through explainable AI
- **Learn best practices** for cleaner code
- **Practice** with targeted debugging challenges

**Quick Start:**
1. Paste your buggy code
2. Ask me specific questions
3. Toggle "Deep Explain" for detailed AI insights

What would you like to work on today?`
  };

  async getChatResponse(message: string, codeSnippet?: string): Promise<string> {
    // Simulate network delay
    await this.delay(800 + Math.random() * 1200);

    const lowerMessage = message.toLowerCase();

    // Check for keywords and return appropriate response
    for (const [keyword, response] of Object.entries(this.responses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    // Code-specific analysis
    if (codeSnippet) {
      return this.analyzeCode(codeSnippet);
    }

    return this.responses.default;
  }

  private analyzeCode(code: string): string {
    // Simple heuristic analysis
    if (!code.trim()) {
      return "I don't see any code. Please paste your Python code and I'll analyze it!";
    }

    const issues: string[] = [];
    const lines = code.split('\n');

    // Check for common issues
    lines.forEach((line, index) => {
      if (line.includes('if ') && !line.trim().endsWith(':')) {
        issues.push(`Line ${index + 1}: Missing colon after if statement`);
      }
      if (line.includes('for ') && !line.trim().endsWith(':')) {
        issues.push(`Line ${index + 1}: Missing colon after for statement`);
      }
      if (line.includes('def ') && !line.trim().endsWith(':')) {
        issues.push(`Line ${index + 1}: Missing colon after function definition`);
      }
    });

    if (issues.length > 0) {
      return `**Code Analysis Results:**\n\n${issues.join('\n')}\n\nWould you like me to explain how to fix these issues?`;
    }

    return `**Code Analysis:**

Your code structure looks good! Here are some observations:
- ${lines.length} lines of code
- Proper syntax structure detected

If you're experiencing a specific error, please let me know:
1. What error message you're seeing
2. What you expected to happen
3. What actually happened

I'm here to help! 🔍`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Generate mock challenges
  getChallenges(): Challenge[] {
    return [
      {
        id: '1',
        title: 'Off-by-One Loop Error',
        description: 'Fix the loop that should print numbers 1 to 10',
        difficulty: 'easy',
        category: 'Loops',
        buggyCode: `for i in range(10):
    print(i)`,
        solution: `for i in range(1, 11):
    print(i)`,
        hints: [
          'range(10) generates 0-9, not 1-10',
          'Try range(1, 11) for numbers 1 through 10'
        ],
        completed: false
      },
      {
        id: '2',
        title: 'List Index Error',
        description: 'Fix the function that crashes when accessing list elements',
        difficulty: 'medium',
        category: 'Lists',
        buggyCode: `def get_last_three(items):
    return [items[-1], items[-2], items[-3]]

my_list = [1, 2]
print(get_last_three(my_list))`,
        solution: `def get_last_three(items):
    if len(items) < 3:
        return items
    return [items[-1], items[-2], items[-3]]

my_list = [1, 2]
print(get_last_three(my_list))`,
        hints: [
          'Check the length of the list first',
          'What happens if the list has fewer than 3 items?'
        ],
        completed: false
      },
      {
        id: '3',
        title: 'Function Return Bug',
        description: 'Fix the function that returns None instead of the result',
        difficulty: 'easy',
        category: 'Functions',
        buggyCode: `def multiply(a, b):
    result = a * b

print(multiply(5, 3))`,
        solution: `def multiply(a, b):
    result = a * b
    return result

print(multiply(5, 3))`,
        hints: [
          'Functions need to explicitly return values',
          'Add a return statement with the result'
        ],
        completed: false
      },
      {
        id: '4',
        title: 'Indentation Error',
        description: 'Fix the syntax error in this conditional statement',
        difficulty: 'easy',
        category: 'Syntax',
        buggyCode: `x = 10
if x > 5:
print("Greater than 5")
else:
    print("Not greater")`,
        solution: `x = 10
if x > 5:
    print("Greater than 5")
else:
    print("Not greater")`,
        hints: [
          'Python uses indentation to define code blocks',
          'Check the indentation after the if statement'
        ],
        completed: false
      },
      {
        id: '5',
        title: 'Infinite Loop Debug',
        description: 'Find and fix the infinite loop',
        difficulty: 'hard',
        category: 'Loops',
        buggyCode: `count = 0
while count < 10:
    print(count)
    if count == 5:
        continue
    count += 1`,
        solution: `count = 0
while count < 10:
    print(count)
    count += 1
    if count == 5:
        print("Reached 5!")`,
        hints: [
          'The continue statement skips the increment when count is 5',
          'Move the increment before the if statement',
          'Or remove the continue and use a different approach'
        ],
        completed: false
      },
      {
        id: '6',
        title: 'Dictionary Key Error',
        description: 'Handle missing dictionary keys safely',
        difficulty: 'medium',
        category: 'Dictionaries',
        buggyCode: `student = {'name': 'Alice', 'age': 20}
print(student['grade'])`,
        solution: `student = {'name': 'Alice', 'age': 20}
print(student.get('grade', 'N/A'))
# Or use:
# if 'grade' in student:
#     print(student['grade'])`,
        hints: [
          'Use .get() method with a default value',
          'Or check if the key exists before accessing'
        ],
        completed: false
      }
    ];
  }
}

export const mockAI = new MockAIService();
