const spawnSync = require('child_process').spawnSync

function viewText (text) {
  spawnSync(`cat <<< "${text.replace(/"/g, '\\"')}" | less`, {
    stdio: 'inherit',
    shell: true,
    detached: true
  })
}

module.exports = { viewText }
