import express from "express";
import configureMiddleware from "../config/middleware.js";
import supabase from "../config/supabase.js";

const app = express();
configureMiddleware(app);
const router = express.Router();

router.get("/count-cart", async (req, res) => {
  try {
    const email = req.session.user[0].email;

    const { data, error } = await supabase
      .from("shopping_cart")
      .select("*", { count: "exact" })
      .eq("user_email", email);

    if (error) {
      res.json(error.message);
    }

    res.json(data);
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/cart", async (req, res) => {
  try {
    const email = req.session.user[0].email;

    const { data, error } = await supabase
      .from("shopping_cart")
      .select(`*, product (*)`)
      .eq("user_email", email);

    if (error) {
      res.json(error.message);
    }

    res.json(data);
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/insert-cart", async (req, res) => {
  try {
    const { product_id, amount } = req.body;
    const email = req.session.user[0].email;
    const active = 1;

    const { data, error } = await supabase
      .from("shopping_cart")
      .insert([
        {
          user_email: email,
          product_id: product_id,
          amount: amount,
          status: active,
        },
      ])
      .select("*");

    if (error) {
      res.json(error.message);
    }

    res.json(data);
  } catch (error) {
    console.error(error.message);
  }
});

router.put("/update-cart-amount/:id", async (req, res) => {
  try {
    const { amount } = req.body;
    const cartId = req.params.id;

    const { data, error } = await supabase
      .from("shopping_cart")
      .update({
        amount: amount,
      })
      .eq("id", cartId)
      .select("*");

    if (error) {
      res.json(error.message);
    }

    res.json(data);
  } catch (error) {
    console.error(error.message);
  }
});

router.put("/update-cart-status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const cartId = req.params.id;

    const { data, error } = await supabase
      .from("shopping_cart")
      .update({
        status: status,
      })
      .eq("id", cartId)
      .select("*");

    if (error) {
      res.json(error.message);
    }

    res.json(data);
  } catch (error) {
    console.error(error.message);
  }
});

router.put("/delete-cart/:id", async (req, res) => {
  try {
    const cartId = req.params.id;

    const { data, error } = await supabase
      .from("shopping_cart")
      .delete()
      .eq("id", cartId);

    if (error) {
      res.json(error.message);
    }

    res.json(data);
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
