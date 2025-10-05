'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { revenueAPI } from "@/response/revenue"
import { RevenueItem } from "@/types/revenue"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RevenueSchema } from "@/schemaValidation/revenue"
import { RevenueSource } from "@/types/enum"
import { toast } from "sonner"

type RevenueInput = z.infer<typeof RevenueSchema>

export default function RevenuePage() {
  const [revenues, setRevenues] = useState<RevenueItem[]>([])
  const [editItem, setEditItem] = useState<RevenueItem | null>(null)
  const [deleteItem, setDeleteItem] = useState<RevenueItem | null>(null)

  const fetchRevenues = async () => {
    const res = await revenueAPI.getAll()
    setRevenues(res.payload.revenues)
  }

  useEffect(() => {
    fetchRevenues()
  }, [])

  const form = useForm<RevenueInput>({
    resolver: zodResolver(RevenueSchema),
    defaultValues: {
      amount: 0,
      source: RevenueSource.POS,
      date: "",
    },
  })

  const onSubmit = async (values: RevenueInput) => {
    if (editItem) {
      await revenueAPI.update(editItem._id, values)
      toast.success("Revenue updated successfully")
      setEditItem(null)
    } else {
      await revenueAPI.create(values)
      toast.success("Revenue added successfully")
    }
    form.reset()
    fetchRevenues()
  }

  const handleDelete = async () => {
    if (!deleteItem) return
    await revenueAPI.delete(deleteItem._id)
    toast.success("Revenue deleted successfully")
    setDeleteItem(null)
    fetchRevenues()
  }

  const openEditDialog = (item: RevenueItem) => {
    setEditItem(item)
    form.reset({
      amount: item.amount,
      source: item.source,
      date: item.date.split('T')[0], // YYYY-MM-DD
    })
  }

  const closeEditDialog = () => setEditItem(null)
  const openDeleteDialog = (item: RevenueItem) => setDeleteItem(item)
  const closeDeleteDialog = () => setDeleteItem(null)

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Revenue</h1>
        <Button
          size="sm"
          variant="outline"
          onClick={() => (window.location.href = "/admin")}
        >
          Back to Admin
        </Button>
      </div>

      {/* Add Revenue Modal */}
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Revenue</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Revenue</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source</FormLabel>
                    <FormControl>
                      <select className="border rounded-md p-2 w-full" {...field}>
                        {Object.values(RevenueSource).map((source) => (
                          <option key={source} value={source}>
                            {source}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="mt-2"
              >
                {form.formState.isSubmitting
                  ? editItem
                    ? "Updating..."
                    : "Saving..."
                  : editItem
                  ? "Update"
                  : "Add"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Revenue Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Date</th>
            <th className="text-left p-2">Source</th>
            <th className="text-left p-2">Amount</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {revenues.length > 0 &&
            revenues.map((r) => (
              <tr key={r._id} className="border-b">
                <td className="p-2">{new Date(r.date).toLocaleDateString()}</td>
                <td className="p-2">{r.source}</td>
                <td className="p-2">{r.amount}</td>
                <td className="p-2 flex gap-2">
                  <Button size="sm" onClick={() => openEditDialog(r)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => openDeleteDialog(r)}>Delete</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteItem} onOpenChange={(open) => !open && closeDeleteDialog()}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Revenue</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this revenue entry?</p>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={closeDeleteDialog}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Revenue Dialog */}
      <Dialog open={!!editItem} onOpenChange={(open) => !open && closeEditDialog()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Revenue</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source</FormLabel>
                    <FormControl>
                      <select className="border rounded-md p-2 w-full" {...field}>
                        {Object.values(RevenueSource).map((source) => (
                          <option key={source} value={source}>
                            {source}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="mt-2"
              >
                {form.formState.isSubmitting ? "Updating..." : "Update"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
