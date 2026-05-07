const targetSpecified = process.argv[2] !== 'none';

let cxxStandard = '14';
if (targetSpecified) {
  // Assume electron if target is specified.
  // If building node 18 / 19 via target, will need to specify C++ standard manually
  const majorVersion = Number.parseInt(process.argv[2].split('.')[0]);
  if (majorVersion >= 20) {
    cxxStandard = '17';
  }
} else {
  // Node 18 === 108, Node 24 === 137 (V8 headers require C++20)
  const moduleVersion = Number.parseInt(process.versions.modules);
  if (moduleVersion >= 137) {
    cxxStandard = '20';
  } else if (moduleVersion >= 108) {
    cxxStandard = '17';
  }
}

process.stdout.write(cxxStandard);
