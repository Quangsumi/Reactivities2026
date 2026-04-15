import {format, formatDistanceToNow, type DateArg } from "date-fns";
import z from 'zod';

export const formatDate = (date: DateArg<Date>) => format(date, 'dd MMM yyyy hh:mm a')

export const requiredString = (fieldName: string) => z.string({error: `${fieldName} is required`}).min(1, {error: `${fieldName} is required`})

export const timeAgo = (date: Date) => formatDistanceToNow(date) + ' ago'