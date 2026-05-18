import re

# 1. Fix docker-compose.yml
with open("docker-compose.yml", "r") as f:
    content = f.read()
content = content.replace("- ./backend/.env", "- ./.env")
with open("docker-compose.yml", "w") as f:
    f.write(content)

# 2. Fix App.jsx
app_file = "frontend/src/App.jsx"
with open(app_file, "r") as f:
    app_content = f.read()

import_pattern = r"import {\n\s+UploadCloud, Briefcase, MapPin, DollarSign, ArrowLeft,\n\s+Building2, Sparkles, Zap, Target, Globe, Shield, ChevronDown,\n\s+Star, CheckCircle, ArrowRight, Brain, Search, FileText\n} from 'lucide-react'"
new_import = """import 'material-symbols/outlined.css'

function Icon({ name, size = 24, color, className = '' }) {
  return (
    <span 
      className={`material-symbols-outlined ${className}`}
      style={{ fontSize: size, color: color, lineHeight: 1 }}
    >
      {name}
    </span>
  )
}"""

app_content = re.sub(import_pattern, new_import, app_content)

replacements = [
    (r"<Sparkles size=\{18\} />", r"<Icon name=\"auto_awesome\" size={18} />"),
    (r"<ChevronDown size=\{18\} />", r"<Icon name=\"expand_more\" size={18} />"),
    (r"<FileText size=\{22\} />", r"<Icon name=\"description\" size={22} />"),
    (r"<Brain size=\{22\} />", r"<Icon name=\"psychology\" size={22} />"),
    (r"<Search size=\{22\} />", r"<Icon name=\"search\" size={22} />"),
    (r"<UploadCloud className=\"upload-icon\" />", r"<Icon name=\"cloud_upload\" className=\"upload-icon\" />"),
    (r"<ArrowLeft size=\{14\} />", r"<Icon name=\"arrow_back\" size={14} />"),
    (r"<Star size=\{14\} />", r"<Icon name=\"star\" size={14} />"),
    (r"<Briefcase size=\{22\} color=\"#6366f1\" />", r"<Icon name=\"work\" size={22} color=\"#6366f1\" />"),
    (r"<Building2 size=\{14\} />", r"<Icon name=\"domain\" size={14} />"),
    (r"<MapPin size=\{14\} />", r"<Icon name=\"location_on\" size={14} />"),
    (r"<DollarSign size=\{14\} />", r"<Icon name=\"attach_money\" size={14} />"),
]

for old, new in replacements:
    app_content = re.sub(old, new, app_content)

with open(app_file, "w") as f:
    f.write(app_content)
