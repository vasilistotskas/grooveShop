import glob
import os

# Set the path to the project root directory
root_dir = "../src/backend"

# Find all the Django apps in the project
app_dirs = glob.glob(os.path.join(root_dir, "*/migrations"))

# Iterate over the app directories
for app_dir in app_dirs:
    # Find all the `*_initial.py` files in the app's migrations directory
    initial_migration_files = glob.glob(os.path.join(app_dir, "*_initial.py"))

    # Iterate over the initial migration files and delete them
    for initial_migration_file in initial_migration_files:
        os.remove(initial_migration_file)
