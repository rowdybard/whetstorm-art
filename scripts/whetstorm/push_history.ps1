# Push this clone's full history to a new, EMPTY GitHub repo in slices.
# GitHub refuses any single push over 2 GB, and this history packs to about
# 7 GB, so main goes up one slice of first-parent history at a time. Safe to
# rerun: slices the remote already has are skipped.
#
#   git remote add origin https://github.com/<you>/whetstorm.git
#   powershell -File scripts/whetstorm/push_history.ps1 -Remote origin
param(
  [Parameter(Mandatory = $true)][string]$Remote,
  [int]$Step = 25
)
$ErrorActionPreference = 'Stop'
$commits = @(git rev-list --first-parent --reverse main)
$remoteSha = ((git ls-remote $Remote refs/heads/main) -split '\s+' | Select-Object -First 1)
for ($i = $Step - 1; $i -lt $commits.Count; $i += $Step) {
  $c = $commits[$i]
  if ($remoteSha) {
    git merge-base --is-ancestor $c $remoteSha 2>$null
    if ($LASTEXITCODE -eq 0) { continue }
  }
  Write-Host "Pushing history slice $($i + 1) of $($commits.Count)"
  git push $Remote "${c}:refs/heads/main"
  if ($LASTEXITCODE -ne 0) {
    throw "Push failed at slice $($i + 1). Rerun with a smaller -Step; slices already pushed are kept."
  }
  $remoteSha = $c
}
git push -u $Remote main
if ($LASTEXITCODE -ne 0) { throw 'Final push of main failed; rerun the script.' }