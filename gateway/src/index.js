import "core-js/stable";
import "regenerator-runtime/runtime";
import moment from "moment";
import { io, server } from './server';

async function main() {

    await server.listen(443, async () => {

        console.log(`listening on *:${443}`, moment().format('DD/MM/YYYY HH:mm:ss'))

        io.on('connection', async socket => {

            console.log("new connection", socket.id);

            socket.on('disconnect', () => {
                console.log("new disconnect", socket.id)
            });

        })
    })
}

main()