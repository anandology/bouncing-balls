import json

code = open("game.py").read()

options = {
    "runtime": "python",
    "code": code,
}

js_options = json.dumps(options)

print(f"var livecode_options =  {js_options};")