import os
from pathlib import Path
import fnmatch

class DirectoryParser:
    def __init__(self, exclude_patterns=None):
        """
        Initialize parser with exclude patterns

        Args:
            exclude_patterns: List of patterns to exclude (supports wildcards)
                            e.g. ['.git', 'node_modules', '*.pyc', '__pycache__']
        """
        self.exclude_patterns = exclude_patterns or [
            '.git',            # Git repository
            'node_modules',    # Node.js modules
            '__pycache__',     # Python cache
            'venv',            # Python virtual environment
            '.env',            # Environment directory
            '.idea',           # IDE settings
            '.vscode',         # VSCode settings
            'dist',            # Distribution directories
            'build',           # Build directories
            '.angular',        # Angular
            'package-lock.json' # package lock
        ]

    def should_exclude(self, path: Path) -> bool:
        """
        Check if a path should be excluded based on patterns

        Args:
            path: Path to check

        Returns:
            bool: True if path should be excluded
        """
        name = path.name
        return any(
            fnmatch.fnmatch(name, pattern)
            for pattern in self.exclude_patterns
        )

    def generate_tree_and_contents(self, start_path: str) -> tuple[str, str]:
        """
        Recursively scan a directory to generate a tree structure and combine all file contents.

        Args:
            start_path: The root directory path to start scanning from

        Returns:
            tuple containing (tree_structure, combined_contents)
        """
        tree_structure = []
        combined_contents = []

        def add_to_tree(path: Path, level: int = 0):
            """Recursively build tree structure and collect file contents"""
            # Skip excluded paths
            if self.should_exclude(path):
                return

            indent = "│   " * (level - 1) + "├── " if level > 0 else ""
            tree_structure.append(f"{indent}{path.name}")

            if path.is_file():
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        combined_contents.append(f"\n{'='*80}\n{path}:\n{'='*80}\n{content}\n")
                except Exception as e:
                    combined_contents.append(f"\n{'='*80}\n{path}:\nError reading file: {str(e)}\n{'='*80}\n")

            if path.is_dir():
                # Sort directories first, then files
                paths = sorted(path.iterdir(), key=lambda x: (not x.is_dir(), x.name.lower()))
                for item in paths:
                    add_to_tree(item, level + 1)

        # Start the recursive process
        root_path = Path(start_path)
        add_to_tree(root_path)

        return ('\n'.join(tree_structure), ''.join(combined_contents))

def save_output(tree: str, contents: str, output_dir: str):
    """
    Save the tree structure and combined contents to files

    Args:
        tree: String containing the tree structure
        contents: String containing all file contents
        output_dir: Directory where to save the output files
    """
    os.makedirs(output_dir, exist_ok=True)

    # Save tree structure
    tree_file = os.path.join(output_dir, 'directory_tree.txt')
    with open(tree_file, 'w', encoding='utf-8') as f:
        f.write(tree)

    # Save combined contents
    contents_file = os.path.join(output_dir, 'combined_contents.txt')
    with open(contents_file, 'w', encoding='utf-8') as f:
        f.write(contents)

def main():
    # Get input from user
    input_dir = input("Enter the directory path to scan: ").strip()
    output_dir = input("Enter the output directory path: ").strip()

    # Get custom exclude patterns
    print("\nEnter patterns to exclude (one per line, empty line to finish):")
    print("Examples: .git, node_modules, *.pyc, temp*, test_*")
    custom_excludes = []
    while True:
        pattern = input().strip()
        if not pattern:
            break
        custom_excludes.append(pattern)

    try:
        # Initialize parser with default + custom exclude patterns
        parser = DirectoryParser(
            exclude_patterns=DirectoryParser().exclude_patterns + custom_excludes
        )

        # Generate tree and contents
        print("\nProcessing directory...")
        tree, contents = parser.generate_tree_and_contents(input_dir)

        # Save results
        save_output(tree, contents, output_dir)
        print(f"\nFiles have been created successfully in {output_dir}:")
        print(f"1. directory_tree.txt - Contains the directory structure")
        print(f"2. combined_contents.txt - Contains all file contents")

    except Exception as e:
        print(f"\nAn error occurred: {str(e)}")

if __name__ == "__main__":
    main()
