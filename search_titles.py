import os
import json
import re

log_path = r"C:\Users\Abhigna\.gemini\antigravity\brain\e90ca953-9e12-4557-8b10-16203957eb88\.system_generated\logs\transcript_full.jsonl"

if os.path.exists(log_path):
    with open(log_path, 'r', encoding='utf-8') as f:
        for i, line in enumerate(f):
            if "<!DOCTYPE html>" in line and "</html>" in line:
                try:
                    data = json.loads(line)
                    for key, val in data.items():
                        if isinstance(val, str) and "<!DOCTYPE html>" in val and "</html>" in val:
                            title_match = re.search(r"<title>(.*?)</title>", val, re.IGNORECASE)
                            title = title_match.group(1) if title_match else "No Title"
                            print(f"Record {i+1} (key={key}): Title='{title}', length={len(val)}")
                    if "tool_calls" in data:
                        for j, tc in enumerate(data["tool_calls"]):
                            if "response" in tc and isinstance(tc["response"], str) and "<!DOCTYPE html>" in tc["response"] and "</html>" in tc["response"]:
                                title_match = re.search(r"<title>(.*?)</title>", tc["response"], re.IGNORECASE)
                                title = title_match.group(1) if title_match else "No Title"
                                print(f"Record {i+1} (tool_call {j}): Title='{title}', length={len(tc['response'])}")
                except Exception as e:
                    pass
