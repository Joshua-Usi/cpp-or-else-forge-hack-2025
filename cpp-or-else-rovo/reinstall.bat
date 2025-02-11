@echo off
call set_env.bat
@echo on
call forge deploy
:: We need to install on both platforms 
call forge install --upgrade --confirm-scopes -s atl-forgehack2-team-11.atlassian.net -p Confluence
