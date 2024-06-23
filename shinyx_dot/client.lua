ESX = nil

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

local MinigameActive = false
local MinigameFinished = false
local Success = false
local SuccessTrigger = nil
local FailTrigger = nil

function StartGame(cb) 
    if MinigameActive then return end

        SetNuiFocus(true, true)
        SendNUIMessage({action = "StartMinigame"})
        MinigameActive = true
        MinigameFinished = false

        while MinigameActive do
            Citizen.Wait(500)
        end

        if cb then
            cb(Success)
        end

        return Success
    end

exports('StartGame', StartGame)



RegisterNUICallback('udane', function(data, cb)
SetNuiFocus(false, false)
Success = true
MinigameFinished = false
MinigameActive = false
cb('ok')
end)

RegisterNUICallback('nieudane', function(data, cb)
SetNuiFocus(false, false)
MinigameActive = false
Success = false
cb('ok')
end)

RegisterCommand('testGame', function()
    local success = exports['shinyx_dot']:StartGame()
    if success == true then
        ESX.ShowNotification('Udano')
    else
        ESX.ShowNotification('Nie Udano')
    end
end)