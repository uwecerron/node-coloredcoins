"use strict";
var jsonrpc = require('../node_modules/jayson/index');
module.exports =function (host,port){
    var client = jsonrpc.client.http({port:8888,hostname:'localhost'});
    var  rpcRequest= function (command, cb){
        command = command || [];
        command.args = command.args || [];

        client.request(command.method,command.args, function(error, value){
            if(error) throw error;
            return cb(value);
        });
    };


    return{
        //Returns a JSON dump of the current configuration
        dump_config: function(cb){
            rpcRequest({method:'dump_config'},function(value){
                cb(value.result);
            });
        },//end dump_config

        //Lists all addresses for a given asset/color
        alladdresses: function(moniker,cb){
            rpcRequest({method:'alladdresses',args:[moniker]},function(value){
                cb(value.result);
            });

        },
        //Creates a new bitcoin address for a given asset/color.
        newaddr: function(moniker,cb){
            rpcRequest({method:'newaddr',args:[moniker]},function(value){
                cb(value.result);
            });

        },
        balance: function(moniker,cb){
            rpcRequest({method:'balance',args:[moniker]},function(value){
                if (value.result<0){console.log('negative balance uh oh!')};
                cb(value.result);
            });

        },
        /** Imports a color definition. This is useful if someone else has issued a color and you want to be able to receive it.  **/
        addasset: function(moniker,color_set,cb){
            rpcRequest({method:'addasset',args:[moniker,color_set]},function(value){
                cb(value.result);
            });

        },
        /**Sets a value in the configuration. Key is expressed like so: key.subkey.subsubkey**/
        setval: function(key,levalue,cb){
            rpcRequest({method:'setval',args:[key,levalue]},function(value){
                cb(value.result);
            });

        },
        /**Returns the value for a given key in the config. Key is expressed like so: key.subkey.subsubkey   **/
          getval: function(key,cb){
            rpcRequest({method:'getval',args:[key]},function(value){
                cb(value.result);
            });

        },
        /**Send some amount of an asset/color to an address**/
        send: function(moniker,address,amount,cb){
            rpcRequest({method:'send',args:[moniker,address,amount]},function(value){
                cb(value);
            });

        },
        /**  Starts a new color based on <coloring_scheme> with
    a name of <moniker> with <units> per share and <atoms>
    total shares.   **/
         issue: function(moniker, pck, units, atoms_in_unit,cb){
            rpcRequest({method:'issue',args:[moniker,pck,units,atoms_in_unit]},function(value){
                cb(value);
            });

        },
      /**Update the database of transactions (amount in each address).  **/
        scan: function(cb){
            rpcRequest({method:'scan'},function(value){
                cb(value);
            });

        },
        /**   print the history of transactions for this color       **/
         history: function(moniker,cb){
            rpcRequest({method:'history',args:[moniker]},function(value){
                cb(value);
            });

        },
        



    }


};