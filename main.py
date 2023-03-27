import os
from os import system

try:
  client.run(os.getenv("token"))
#Bot Restarter
except discord.errors.HTTPException:
  print("\n\n\nBLOCKED BY RATE LIMITS\nRESTARTING NOW\n\n\n")
  system("restarter.py")
  system('kill 1')