/*
 * Copyright (c) 2024 - Restate Software, Inc., Restate GmbH
 *
 * This file is part of the Restate examples,
 * which is released under the MIT license.
 *
 * You can find a copy of the license in the file LICENSE
 * in the root directory of this repository or package or at
 * https://github.com/restatedev/examples/
 */

import * as restate from "@restatedev/restate-sdk";
import {TicketStatus} from "../auxiliary/ticket_status";

export const ticketObject = restate.object({
  name: "TicketObject",
    handlers: {
        async reserve(ctx: restate.ObjectContext){
            const status = (await ctx.get<TicketStatus>("status")) ?? TicketStatus.Available;
            if (status === TicketStatus.Available) {
                ctx.set("status", TicketStatus.Reserved);
                return true;
            }
            const currentStatus = await ctx.get<TicketStatus>("status");
            return currentStatus;
        },

        async unreserve(ctx: restate.ObjectContext){
            const status = (await ctx.get<TicketStatus>("status")) ?? TicketStatus.Available;
            if (status === TicketStatus.Reserved) {
                ctx.set("status", TicketStatus.Available);
                return true;
            }
            return false;
        },

        async markAsSold(ctx: restate.ObjectContext){
            const status = (await ctx.get<TicketStatus>("status")) ?? TicketStatus.Available;
            if (status === TicketStatus.Reserved) {
                ctx.set("status", TicketStatus.Sold);
                return true;
            }
            return false;
        },
    }
});

export const TicketObject: typeof ticketObject = { name: "TicketObject" };
