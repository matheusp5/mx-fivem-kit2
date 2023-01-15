const { VrpProxy, VrpTunnel } = require('@vrpjs/server');

const vRP = VrpProxy.getInterface('vRP');
const vRPClient = VrpTunnel.getInterface('vRP');
const main = require("./main.json")
const fs = require("fs")
const imgbbUploader = require("imgbb-uploader");


RegisterCommand("kitmx", function (source, args, rawCommand) {
    // kitmx [version] [playerid]
    // version -> 1, 2, 3
    let KitVersion = parseInt(args[0])

    let SenderId = vRP.getUserId(source)
    let SenderSource = source

    let ReciverId = parseInt(args[1])
    let ReciverSource = vRP.getUserSource(ReciverId)

    if(vRP.hasPermission(SenderId, "owner.permissao")) {
        if(KitVersion == 1) {    
            AddWeaponToPlayer(ReciverSource, [
                "weapon_pistol_mk2",
                "weapon_assultrifle_mk2",
            ])
            vRP.giveBankMoney(ReciverId, 100000)
        } else if (KitVersion == 2) {
            AddWeaponToPlayer(ReciverSource, [
                "weapon_pistol_mk2",
                "weapon_assultrifle_mk2",
                "weapon_pumpshotgun_mk2",
                "weapon_knife"
            ])
            vRP.giveBankMoney(ReciverId, 200000)
        } else if (KitVersion == 3) {
            AddWeaponToPlayer(ReciverSource, [
                "weapon_pistol_mk2",
                "weapon_assultrifle_mk2",
                "weapon_pumpshotgun_mk2",
                "weapon_knife",
                "weapon_smg_mk2",
                "weapon_machete"
            ])
            vRP.giveBankMoney(ReciverId, 225000)

        }
        emitNet("Notify", SenderSource, "sucesso", "O jogador recebeu o kit mx com sucesso!")
    } else {
        emitNet("Notify", SenderSource, "negado", "Nao foi possivel enviar o kit mx para o jogador!")
    }
    
})

function AddWeaponToPlayer(source, weapons) {
    weapons.forEach(element => {
        GiveWeaponToPed(
            source,
            GetHashKey(element),
            999,
            false,
            false
        );
    });
}
