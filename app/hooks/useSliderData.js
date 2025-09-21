import { useState, useEffect, useCallback } from "react";
import adminCache from "../utils/adminCache";

export function useSliderData() {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSliders = useCallback(async (forceRefresh = false) => {
    const cacheKey = "admin-sliders";

    if (!forceRefresh) {
      const cachedData = adminCache.get(cacheKey);
      if (cachedData) {
        setSliders(cachedData);
        setLoading(false);
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/admin/sliders`);
      if (!res.ok) {
        throw new Error("Failed to fetch sliders");
      }

      const data = await res.json();
      const slidersData = data.items || [];

      adminCache.set(cacheKey, slidersData);
      setSliders(slidersData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createSlider = useCallback(async (sliderData) => {
    try {
      const res = await fetch(`/api/admin/sliders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sliderData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error?.message || "Failed to create slider");
      }

      adminCache.invalidate("admin-sliders");
      return await res.json();
    } catch (err) {
      throw err;
    }
  }, []);

  const updateSlider = useCallback(async (id, sliderData) => {
    try {
      const res = await fetch(`/api/admin/sliders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sliderData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error?.message || "Failed to update slider");
      }

      adminCache.invalidate("admin-sliders");
      return await res.json();
    } catch (err) {
      throw err;
    }
  }, []);

  const deleteSlider = useCallback(async (id) => {
    try {
      const res = await fetch(`/api/admin/sliders/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete slider");
      }

      adminCache.invalidate("admin-sliders");
      return true;
    } catch (err) {
      throw err;
    }
  }, []);

  const reorderSliders = useCallback(async (newOrder) => {
    try {
      const reorderData = newOrder.map((slider, index) => ({
        id: slider._id,
        order: index,
      }));

      const res = await fetch(`/api/admin/sliders/reorder`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sliders: reorderData }),
      });

      if (!res.ok) {
        throw new Error("Failed to reorder sliders");
      }

      adminCache.invalidate("admin-sliders");
      return await res.json();
    } catch (err) {
      throw err;
    }
  }, []);

  useEffect(() => {
    loadSliders();
  }, [loadSliders]);

  return {
    sliders,
    loading,
    error,
    refetch: () => loadSliders(true),
    createSlider,
    updateSlider,
    deleteSlider,
    reorderSliders,
  };
}

export function useHomepageSliders() {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadSliders = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_BASE;

        const res = await fetch(`${apiBase}/api/sliders`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(
            `Failed to fetch sliders: ${res.status} ${res.statusText}`
          );
        }

        const data = await res.json();

        if (active) {
          const sliderItems = data.items || [];
          setSliders(sliderItems);
        }
      } catch (error) {
        if (active) {
          setSliders([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadSliders();
    return () => {
      active = false;
    };
  }, []);

  return { sliders, loading };
}
