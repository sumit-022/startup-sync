import React, { createContext, useState, useEffect } from "react";

interface Stats {
  data: any;
  loading: boolean;
  error: string | null;
}

const StatsContext = createContext<Stats>({
  data: null,
  loading: false,
  error: null,
});

export default StatsContext;
