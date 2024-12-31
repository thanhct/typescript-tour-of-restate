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
import {TicketObject} from "./ticket_object";
import {CheckoutService} from "./checkout_service";

// <start_user_session>
export const cartObject = restate.object({
  name: "CartObject",
  handlers: {
    async addTicket(ctx: restate.ObjectContext, ticketId: string){
      const reservationSuccess = await ctx.objectClient(TicketObject, ticketId).reserve();

      if (reservationSuccess) {
        const tickets = (await ctx.get<string[]>("tickets")) ?? [];
        tickets.push(ticketId);
        ctx.set("tickets", tickets);

        ctx.objectSendClient(CartObject, ctx.key, {delay: 15 * 60 * 1000})
            .expireTicket(ticketId);
      }

      return reservationSuccess;
    },

    async checkout(ctx: restate.ObjectContext){
      const tickets = (await ctx.get<string[]>("tickets") ) ?? []
      
      if (tickets.length === 0) {
        return false;
      }

      const success = await ctx.serviceClient(CheckoutService)
                              .handle({userId: ctx.key, tickets: tickets});
      
      if (success) {
        for (const ticketId of tickets) {
          ctx.objectSendClient(TicketObject, ticketId).markAsSold();
        }
        ctx.clear("tickets");
      }
      
      return 'checkout';
    },

    async expireTicket(ctx: restate.ObjectContext, ticketId: string){
      const tickets = (await ctx.get<string[]>("tickets")) ?? [];
      const index = tickets.indexOf(ticketId);
      if (index > -1) {
        tickets.splice(index, 1);
        ctx.set("tickets", tickets);
        const reservations = await ctx.objectSendClient(TicketObject,  ticketId).unreserve();
        return reservations;
      }
      return 'unreserve';
    },
  }
});
// <end_user_session>

export const CartObject: typeof cartObject = { name: "CartObject" };