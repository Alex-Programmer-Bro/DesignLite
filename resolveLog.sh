#!/bin/bash

# 执行提取命令
RELEASEBODY=$(awk -v RS='Release [0-9.]+:' '/[0-9.]+/ {print $0}' ChangeLog.h | sed 's/^[[:space:]]*Release [0-9.]\+-[^:]*:[[:space:]]*//' | sed 's/  */ /g' | sed -e 's/^ *//' -e 's/ *$//')

echo "Extracted Release Body:"
echo "$RELEASEBODY"
